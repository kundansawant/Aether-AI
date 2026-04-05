import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
}

export type ProvableCircuits<PS> = {
}

export type PureCircuits = {
  registerModel(modelId_0: Uint8Array,
                provider_0: Uint8Array,
                fee_0: bigint,
                metadata_0: Uint8Array): [];
  submitRequest(requestId_0: Uint8Array,
                user_0: Uint8Array,
                modelId_0: Uint8Array,
                commitment_0: Uint8Array): [];
  completeInference(requestId_0: Uint8Array): [];
}

export type Circuits<PS> = {
  registerModel(context: __compactRuntime.CircuitContext<PS>,
                modelId_0: Uint8Array,
                provider_0: Uint8Array,
                fee_0: bigint,
                metadata_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitRequest(context: __compactRuntime.CircuitContext<PS>,
                requestId_0: Uint8Array,
                user_0: Uint8Array,
                modelId_0: Uint8Array,
                commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  completeInference(context: __compactRuntime.CircuitContext<PS>,
                    requestId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
