import { DataTypes } from 'sequelize';

export class Ctrc {

  id = {
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.UUID,
  };

  queueId = {
    field: 'queueId',
    type: DataTypes.UUID,
  };

  serieNumeroCTRC = {
    field: 'serieNumeroCTRC',
    type: DataTypes.STRING(80)
  };

  serieCt = {
    field: 'serieCt',
    type: DataTypes.NUMBER
  };

  numeroCt = {
    field: 'numeroCt',
    type: DataTypes.NUMBER
  };

  tipoDocumento = {
    field: 'tipoDocumento',
    type: DataTypes.STRING(25)
  };

  pracaExpedidora = {
    field: 'pracaExpedidora',
    type: DataTypes.STRING(4)
  };

  unidadeEmissora = {
    field: 'unidadeEmissora',
    type: DataTypes.STRING(3)
  };

  dataEmissao = {
    field: 'dataEmissao',
    type: DataTypes.DATE
  };

  dataAutorizacao = {
    field: 'dataAutorizacao',
    type: DataTypes.DATE
  };

  login = {
    field: 'login',
    type: DataTypes.STRING(15)
  };

  numeroControle = {
    field: 'numeroControle',
    type: DataTypes.STRING(15)
  };

  placaColeta = {
    field: 'placaColeta',
    type: DataTypes.STRING(20)
  };

  chaveCt = {
    field: 'chaveCt',
    type: DataTypes.STRING(44)
  };

  cnpjRemetente = {
    field: 'cnpjRemetente',
    type: DataTypes.STRING(14)
  };

  nomeRemetente = {
    field: 'nomeRemetente',
    type: DataTypes.STRING(70)
  };

  enderecoRemetente = {
    field: 'enderecoRemetente',
    type: DataTypes.STRING(100)
  }

  bairroRemetente = {
    field: 'bairroRemetente',
    type: DataTypes.STRING(50)
  }

  setorColeta = {
    field: 'setorColeta',
    type: DataTypes.STRING(5)
  }

  cidadeRemetente = {
    field: 'cidadeRemetente',
    type: DataTypes.STRING(40)
  }

  ufRemetente = {
    field: 'ufRemetente',
    type: DataTypes.STRING(2)
  }

  cepRemetente = {
    field: 'cepRemetente',
    type: DataTypes.STRING(8)
  }

  cnpjExpedidor = {
    field: 'cnpjExpedidor',
    type: DataTypes.STRING(14)
  }

  nomeExpedidor = {
    field: 'nomeExpedidor',
    type: DataTypes.STRING(70)
  }

  cidadeExpedidor = {
    field: 'cidadeExpedidor',
    type: DataTypes.STRING(40)
  }

  cidadeExpedidor = {
    field: 'cidadeExpedidor',
    type: DataTypes.STRING(40)
  }

  ufExpedidor = {
    field: 'ufExpedidor',
    type: DataTypes.STRING(2)
  }

  cnpjPagador = {
    field: 'cnpjPagador',
    type: DataTypes.STRING(14)
  }

  nomePagador = {
    field: 'nomePagador',
    type: DataTypes.STRING(70)
  }

  enderecoPagador = {
    field: 'enderecoPagador',
    type: DataTypes.STRING(100)
  }

  bairroPagador = {
    field: 'bairroPagador',
    type: DataTypes.STRING(50)
  }

  cidadePagador = {
    field: 'cidadePagador',
    type: DataTypes.STRING(50)
  }

  ufPagador = {
    field: 'ufPagador',
    type: DataTypes.STRING(2)
  }

  fonePagador = {
    field: 'fonePagador',
    type: DataTypes.STRING(12)
  }

  segmentoPagador = {
    field: 'segmentoPagador',
    type: DataTypes.STRING(30)
  }

}