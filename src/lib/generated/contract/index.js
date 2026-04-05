import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeField;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      registerModel(context, ...args_1) {
        return { result: pureCircuits.registerModel(...args_1), context };
      },
      submitRequest(context, ...args_1) {
        return { result: pureCircuits.submitRequest(...args_1), context };
      },
      completeInference(context, ...args_1) {
        return { result: pureCircuits.completeInference(...args_1), context };
      }
    };
    this.impureCircuits = {};
    this.provableCircuits = {};
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _registerModel_0(modelId_0, provider_0, fee_0, metadata_0) { return []; }
  _submitRequest_0(requestId_0, user_0, modelId_0, commitment_0) { return []; }
  _completeInference_0(requestId_0) { return []; }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
  registerModel: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`registerModel: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const modelId_0 = args_0[0];
    const provider_0 = args_0[1];
    const fee_0 = args_0[2];
    const metadata_0 = args_0[3];
    if (!(modelId_0.buffer instanceof ArrayBuffer && modelId_0.BYTES_PER_ELEMENT === 1 && modelId_0.length === 32)) {
      __compactRuntime.typeError('registerModel',
                                 'argument 1',
                                 'marketplace.compact line 9 char 1',
                                 'Bytes<32>',
                                 modelId_0)
    }
    if (!(provider_0.buffer instanceof ArrayBuffer && provider_0.BYTES_PER_ELEMENT === 1 && provider_0.length === 32)) {
      __compactRuntime.typeError('registerModel',
                                 'argument 2',
                                 'marketplace.compact line 9 char 1',
                                 'Bytes<32>',
                                 provider_0)
    }
    if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0 && fee_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.typeError('registerModel',
                                 'argument 3',
                                 'marketplace.compact line 9 char 1',
                                 'Field',
                                 fee_0)
    }
    if (!(metadata_0.buffer instanceof ArrayBuffer && metadata_0.BYTES_PER_ELEMENT === 1 && metadata_0.length === 32)) {
      __compactRuntime.typeError('registerModel',
                                 'argument 4',
                                 'marketplace.compact line 9 char 1',
                                 'Bytes<32>',
                                 metadata_0)
    }
    return _dummyContract._registerModel_0(modelId_0,
                                           provider_0,
                                           fee_0,
                                           metadata_0);
  },
  submitRequest: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`submitRequest: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const requestId_0 = args_0[0];
    const user_0 = args_0[1];
    const modelId_0 = args_0[2];
    const commitment_0 = args_0[3];
    if (!(requestId_0.buffer instanceof ArrayBuffer && requestId_0.BYTES_PER_ELEMENT === 1 && requestId_0.length === 32)) {
      __compactRuntime.typeError('submitRequest',
                                 'argument 1',
                                 'marketplace.compact line 13 char 1',
                                 'Bytes<32>',
                                 requestId_0)
    }
    if (!(user_0.buffer instanceof ArrayBuffer && user_0.BYTES_PER_ELEMENT === 1 && user_0.length === 32)) {
      __compactRuntime.typeError('submitRequest',
                                 'argument 2',
                                 'marketplace.compact line 13 char 1',
                                 'Bytes<32>',
                                 user_0)
    }
    if (!(modelId_0.buffer instanceof ArrayBuffer && modelId_0.BYTES_PER_ELEMENT === 1 && modelId_0.length === 32)) {
      __compactRuntime.typeError('submitRequest',
                                 'argument 3',
                                 'marketplace.compact line 13 char 1',
                                 'Bytes<32>',
                                 modelId_0)
    }
    if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
      __compactRuntime.typeError('submitRequest',
                                 'argument 4',
                                 'marketplace.compact line 13 char 1',
                                 'Bytes<32>',
                                 commitment_0)
    }
    return _dummyContract._submitRequest_0(requestId_0,
                                           user_0,
                                           modelId_0,
                                           commitment_0);
  },
  completeInference: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`completeInference: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const requestId_0 = args_0[0];
    if (!(requestId_0.buffer instanceof ArrayBuffer && requestId_0.BYTES_PER_ELEMENT === 1 && requestId_0.length === 32)) {
      __compactRuntime.typeError('completeInference',
                                 'argument 1',
                                 'marketplace.compact line 17 char 1',
                                 'Bytes<32>',
                                 requestId_0)
    }
    return _dummyContract._completeInference_0(requestId_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
