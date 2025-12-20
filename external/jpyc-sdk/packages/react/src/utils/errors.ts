/** Custom abstract error class. */
abstract class JpycSdkError extends Error {}

/** Thrown when SDK context is undefined. */
export class JpycSdkContextUndefined extends JpycSdkError {
  constructor() {
    super('`useConfig` must be used inside <JpycSdkProvider>.');
  }
}

/** Thrown when the connected chain is not supported. */
export class ConnectedChainNotSupported extends JpycSdkError {
  constructor({ chainId }: { chainId: number }) {
    super(`The connected chain (id = ${chainId}) is not supported by the SDK.`);
  }
}

/** Thrown when the value of environment variable `JPYC_SDK_ENV` is invalid. */
export class JpycSdkEnvInvalid extends JpycSdkError {
  constructor({ env }: { env: string }) {
    super(
      `Value of config variable 'env' seems invalid (${env}). Please set it to either 'prod' or 'local'`,
    );
  }
}

/** Thrown when environment variable `JPYC_SDK_ENV` is undefined. */
export class JpycSdkEnvUndefined extends JpycSdkError {
  constructor() {
    super("Config variable 'env' seems undefined.");
  }
}

/** Thrown when the value of environment variable `JPYC_SDK_CONTRACT_TYPE` is invalid. */
export class ContractTypeInvalid extends JpycSdkError {
  constructor({ contractType }: { contractType: string }) {
    super(
      `Value of config variable 'contractType' seems invalid (${contractType}). Please set it to either 'jpyc' or 'jpycPrepaid'`,
    );
  }
}

/** Thrown when environment variable `JPYC_SDK_CONTRACT_TYPE` is undefined. */
export class ContractTypeUndefined extends JpycSdkError {
  constructor() {
    super("Config variable 'contractType' seems undefined.");
  }
}

/** Thrown when writeContract is not ready to be called. */
export class WriteContractNotReady extends JpycSdkError {
  constructor() {
    super("'writeContract' is not ready to be called.");
  }
}
