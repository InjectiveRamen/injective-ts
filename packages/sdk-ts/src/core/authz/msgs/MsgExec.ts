import { MsgExec as BaseMsgExec } from '@injectivelabs/chain-api/cosmos/authz/v1beta1/tx_pb'
import { Any } from 'google-protobuf/google/protobuf/any_pb'

import { MsgBase } from '../../MsgBase'
import { Msgs } from '../../msgs'

export declare namespace MsgExec {
  export interface Params {
    grantee: string
    msgs: Msgs | Msgs[]
  }

  export interface DirectSign {
    type: '/cosmos.authz.v1beta1.MsgExec'
    message: BaseMsgExec
  }

  export interface Data extends BaseMsgExec.AsObject {
    '@type': '/cosmos.authz.v1beta1.MsgExec'
  }

  export interface Amino extends BaseMsgExec.AsObject {
    '@type': '/cosmos.authz.v1beta1.MsgExec'
  }

  export type Proto = BaseMsgExec
}

export default class MsgExec extends MsgBase<
  MsgExec.Params,
  MsgExec.Data,
  MsgExec.Proto,
  MsgExec.Amino,
  MsgExec.DirectSign
> {
  static fromJSON(params: MsgExec.Params): MsgExec {
    return new MsgExec(params)
  }

  toProto(): MsgExec.Proto {
    const { params } = this

    const message = new BaseMsgExec()
    message.setGrantee(params.grantee)

    const msgs = Array.isArray(params.msgs) ? params.msgs : [params.msgs]
    msgs.forEach(msg => {
      const msgValue = new Any()
      msgValue.setTypeUrl(msg.toData()['@type'])
      msgValue.setValue(msg.toProto().serializeBinary())

      message.addMsgs(msgValue)
    });

    return message
  }

  toData(): MsgExec.Data {
    const proto = this.toProto()

    return {
      '@type': '/cosmos.authz.v1beta1.MsgExec',
      ...proto.toObject()
    }
  }

  toAmino(): MsgExec.Amino {
    const proto = this.toProto()

    return {
      '@type': '/cosmos.authz.v1beta1.MsgExec',
      ...proto.toObject(),
    }
  }

  toDirectSign(): MsgExec.DirectSign {
    const proto = this.toProto()

    return {
      type: '/cosmos.authz.v1beta1.MsgExec',
      message: proto
    }
  }
}
