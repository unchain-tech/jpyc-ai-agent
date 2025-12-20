/** Custom abstract error class. */
abstract class JpycSdkError extends Error {}

/** Thrown when chain is not supported. */
export class InvalidChainIdError extends JpycSdkError {
  constructor({ chainId }: { chainId: number }) {
    super(`Chain with ID=${chainId} has not been supported yet.`);
  }
}

/** Thrown when contract ABI is undefined. */
export class UndefinedContractAbiError extends JpycSdkError {
  constructor() {
    super(`Contact ABI undefined.`);
  }
}

/** Thrown when contract address is undefined. */
export class UndefinedContractAddressError extends JpycSdkError {
  constructor() {
    super(`Contact address undefined.`);
  }
}

/** Thrown when transaction simulation fails. */
export class FailedTransactionSimulationError extends JpycSdkError {
  constructor({ message }: { message: string }) {
    super(`Transaction simulation failed. Reason: ${message}.`);
  }
}
