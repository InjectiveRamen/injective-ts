import { Coin } from '@injectivelabs/chain-api/cosmos/base/v1beta1/coin_pb'
import { MsgExecuteContract as BaseMsgExecuteContract } from '@injectivelabs/chain-api/cosmwasm/wasm/v1/tx_pb'
import { toUtf8 } from '../../../utils'
import { MsgBase } from '../../MsgBase'

export declare namespace MsgExecuteContract {
  export interface Params {
    amount?: {
      denom: string
      amount: string
    }
    action: string
    sender: string
    contractAddress: string
    msg: Object
  }

  export interface DirectSign {
    type: '/cosmwasm.wasm.v1.MsgExecuteContract'
    message: BaseMsgExecuteContract
  }

  export interface Data extends BaseMsgExecuteContract.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgExecuteContract'
  }

  export interface Amino extends BaseMsgExecuteContract.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgExecuteContract'
  }

  export type Proto = BaseMsgExecuteContract
}

export default class MsgExecuteContract extends MsgBase<
  MsgExecuteContract.Params,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto,
  MsgExecuteContract.Amino,
  MsgExecuteContract.DirectSign
> {
  static fromJSON(params: MsgExecuteContract.Params): MsgExecuteContract {
    return new MsgExecuteContract(params)
  }

  toProto(): MsgExecuteContract.Proto {
    const { params } = this

    const message = new BaseMsgExecuteContract()
    const msg = { [params.action]: params.msg }

    message.setMsg(toUtf8(JSON.stringify(msg)))
    message.setSender(params.sender)
    message.setContract(params.contractAddress)

    if (params.amount) {
      const funds = new Coin()

      funds.setAmount(params.amount.amount)
      funds.setDenom(params.amount.denom)

      message.setFundsList([funds])
    }

    return message
  }

  toData(): MsgExecuteContract.Data {
    const proto = this.toProto()

    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      ...proto.toObject(),
    }
  }

  toAmino(): MsgExecuteContract.Amino {
    const proto = this.toProto()

    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      ...proto.toObject(),
    }
  }

  toDirectSign(): MsgExecuteContract.DirectSign {
    const proto = this.toProto()

    return {
      type: '/cosmwasm.wasm.v1.MsgExecuteContract',
      message: proto,
    }
  }
}
