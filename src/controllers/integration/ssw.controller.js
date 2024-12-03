import axios from 'axios'
import * as cheerio from 'cheerio'
import { parseStringPromise } from 'xml2js'
import csv from 'csvtojson'
import _ from 'lodash'
import dayjs from 'dayjs'
import { IntegrationSSWContext } from '../../databases/integrationSSW/index.js'

const headers = {'Cookie': 'remember=1; useri=70145314170; sigla_emp=1TC; login=venancio; chave=5400XKDVHA; ssw_dom=1TC; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI5NjI0NTYsInB4eSI6IjE3Mi4zMS41Ni4xOTQifQ.DDl6qcif3xHSR7Aak_sPaZYXGeq8sYIN7mJtFQH0_fE'}

export class IntegrationSSWController {

  generate = async (req, res) => {
    
    res.status(200).json({})

  }

  import = async (req, res) => {
    try {

      throw new Error('teste')

      const response = await axios.post('https://sistema.ssw.inf.br/bin/ssw1440', null, {headers})

      const $ = cheerio.load(response.data)

      const json = await parseStringPromise($('xml').html().toString())
      
      for (const item of json.rs.r) {

        if (item.f1[0] == '930 - Gera BD de Ocorr&ecirc;ncias') {
    
            console.log(`[Importando] - ${item.f0[0]} | ${item.f1[0]}`)
    
            //await importarOcorrencias(item.f0[0]);
    
        }
    
        if (item.f1[0] == '455 - Fretes Expedidos/Recebidos - CTRCs') {
    
            console.log(`[Importando] - ${item.f0[0]} | ${item.f1[0]}`)
    
            await this.importCTRC(item.f0[0])
    
        }
        
      }

      res.status(200).json({})

    } catch (error) {
      res.status(201).send(error.message)
    }
  }

  downloadFile = async (code) => {

    const url = `https://sistema.ssw.inf.br/bin/ssw0424?act=CSV1TC00${code}.sswweb&filename=CSV1TC00${code}.csv&path=/usr/aws/jobs/1TC/&down=1`

    return await axios.get(url, {headers})

  }

  importCTRC = async (code) => {

    const db = new IntegrationSSWContext()

    const queue = await db.Queue.findOne({attributes: ['id'], where: [{code}]})

    if (queue) {
        return
    }

    const response = await this.downloadFile(code)

    let data = response.data.split('\n')

    data.shift()
    data.pop()

    const json = await csv({delimiter: ';'}).fromString(data.join('\n'))

    await db.transaction(async (transaction) => {
        
        const queue = await db.Queue.create({code}, {transaction})

        for (const item of json) {

            const row = {
                serieNumeroCTRC: item['Serie/Numero CTRC'],
                serieCt: _.toNumber(item['Serie/Numero CT-e']?.substring(0, 3)),
                numeroCt: _.toNumber(item['Serie/Numero CT-e']?.substring(4, 12)),
                tipoDocumento: item['Tipo do Documento'],
                pracaExpedidora: item['Praca Expedidora'],
                unidadeEmissora: item['Unidade Emissora'],
                //dataEmissao: toDate(item['Data de Emissao']) + ' ' + item['Hora de Emissao'],
                //dataAutorizacao: toDate(item['Data de Autorizacao']) + ' ' + item['Hora de Autorizacao'],
                login: item['Login'],
                numeroControle: item['Numero de Controle'],
                placaColeta: item['Placa de Coleta'],
                chaveCt: item['Chave CT-e']?.substring(0, 44),
                
                cnpjRemetente: item['CNPJ Remetente']?.substring(0, 14),
                nomeRemetente: item['Cliente Remetente'],
                enderecoRemetente: item['Endereco do Remetente'],
                bairroRemetente: item['Bairro do Remetente'],
                setorColeta: item['Setor de Coleta'],
                cidadeRemetente: item['Cidade do Remetente'],
                ufRemetente: item['UF do Remetente'],
                cepRemetente: item['CEP do Remetente']?.replace(/[^0-9]/g,''),

                cnpjExpedidor: item['CNPJ Expedidor']?.substring(0, 14),
                nomeExpedidor: item['Cliente Expedidor'],
                cidadeExpedidor: item['Cidade do Expedidor'],
                ufExpedidor: item['UF do Expedidor'],

                cnpjPagador: item['CNPJ Pagador']?.substring(0, 14),
                nomePagador: item['Cliente Pagador'],
                enderecoPagador: item['Endereco do Pagador'],
                bairroPagador: item['Bairro do Pagador'],
                cidadePagador: item['Cidade do Pagador'],
                ufPagador: item['UF do Pagador'],
                fonePagador: item['Fone do Pagador']?.replace(/[^0-9]/g,''),
                segmentoPagador: item['Segmento do Pagador'],
            }

            if (row.numeroCt && row.serieCt) {

                const ctrc = await db.Ctrc.findOne({attributes: ['id'], where: [{numeroCt: row.numeroCt, serieCt: row.serieCt}], transaction})

                if (!ctrc) {

                    console.log(`CTRC - Número: ${row.numeroCt} | Série: ${row.serieCt} | Emissão: ${row.dataEmissao} | Tipo: ${row.tipoDocumento} | Praça: ${row.pracaExpedidora}`)
                    
                    await db.Ctrc.create({queueId: queue.id, ...row}, {transaction})
                    
                }

            }

        }

    })

  }

}