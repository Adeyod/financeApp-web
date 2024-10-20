import React, { CSSProperties } from 'react';

export type FormData = ResetPasswordData & {
  first_name: string;
  user_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
};

export type FundFlowProp = {
  selectedAccountNumber: string;
};

export type ResetPasswordData = {
  password: string;
  confirm_password: string;
};

export type ChangePasswordData = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};

export type LoginFormData = {
  login_input: string;
  password: string;
};

export type Account = {
  account_number: string;
  balance: string;
  created_at: string;
  id: string;
  is_default: boolean;
  updated_at: string;
  user_id: string;
};

export type SuccessMessage = {
  message: string;
  success: boolean;
};

export type TransactionType = {
  account_id: string;
  account_number: string;
  amount: string;
  created_at: string;
  description: string;
  id: string;
  receiving_account: string;
  reference_number: string;
  transaction_date: string;
  transaction_source: string;
  transaction_status: string;
  transaction_type: string;
  updated_at: string;
  user_id: string;
};

export type TransactionResponse = {
  transactions: TransactionType[];
  message: string;
};

// export type TransactionResponse = SuccessMessage & {
//   transactions: TransactionType[];
//   completed_transactions: number;
//   total_transactions: number;
//   data: {
//     accounts: {
//       id: string;
//       user_id: string;
//       account_number: string;
//       balance: number;
//       is_default: boolean;
//       created_at: string;
//       updated_at: string;
//     };
//   };
// };

export type TransactionProps = TransactionResponse & {
  message: string;
  data: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: number;
      is_default: boolean;
      created_at: string;
      updated_at: string;
    };
  };
};

export type TransactionDataType = SuccessMessage & {
  transactions: {
    transactions: TransactionType[];
    totalCount: number;
  };
};

export type ReceiverInfo = {
  account_number: string;
  account_name: string;
  bank_code: string;
};

export type CreditOptionsType = {
  // accountTransactions: AccountInfoType;
  accountInfo: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: string;
      is_default: boolean;
      created_at: string;
      updated_at: string;
    };
  };
  selectedAccountNumber: string;
  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;
};

export type AccountInfoType = {
  selectedAccountNumber: string;
  accountInfo: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: number;
      is_default: boolean;
      created_at: string;
      updated_at: string;
    };
  };

  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;
};

export type BankProps = {
  id: string;
  bank_id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
};
// export type AccountInfoType = {
//   singleAccountTransactionDetails: TransactionType[];
//   singleAccountCompletedTransactionsCount: number;
//   singleAccountTotalTransactionsCount: number;
//   accountInfo: Account;
// };

export type UserState = {
  currentUser: {
    id: string;
    status: string;
    user_name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    two_fa_enabled: boolean;
    biometric_enabled: boolean;
    is_verified: boolean;
    is_updated: boolean;
    created_at: string;
    updated_at: string;
    is_phone_verified: boolean;
    profile_image: {
      url: string;
      public_id: string;
    };
  };

  access: string;
  loading: boolean;
  error: null;
};

export type AccountState = {
  accountDetails: {
    message: string;
    success: boolean;
    accounts: Account[];
  };

  singleAccountDetails: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: string;
      is_default: false;
      created_at: string;
      updated_at: string;
    };
  };

  loading: boolean;
  error: boolean;
};

export type TransactionState = {
  transactionDetails: TransactionType[];
  totalTransactionsCount: number;
  singleAccountTransactionDetails: TransactionType[];
  singleTransactionDetails: {
    id: string;
    user_id: string;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_status: string;
    description: string;
    account_id: string;
    reference_number: string;
    created_at: string;
    updated_at: string;
    transaction_source: string;
    receiving_account: string;
    account_number: string;
    receiving_account_number: string;
    receiving_bank_name: string;
    receiver_account_name: string;
  };
  // singleAccountTransactionDetails: TransactionResponse[];

  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;

  loading: boolean;
  error: boolean;
};

export type ButtonProps = {
  title: string;
  loading: boolean;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  buttonStyle?: CSSProperties | string;
  buttonContainerStyle?: CSSProperties | string;
  buttonTextStyle?: CSSProperties | string;
};

export type FormDataKey = keyof FormData;
export type LoginFormDataKey = keyof LoginFormData;
export type ResetPasswordKey = keyof ResetPasswordData;
export type ChangePasswordKey = keyof ChangePasswordData;

export type CommonParams = {
  title: string;
  type: string;
  required: boolean;
  placeholder: string;
};

export type LoginParams = CommonParams & {
  field: LoginFormDataKey;
};

export type RegisterParams = CommonParams & {
  field: FormDataKey;
};

export type ResetPasswordParams = CommonParams & {
  field: ResetPasswordKey;
};

export type ChangePasswordParams = CommonParams & {
  field: ChangePasswordKey;
};

export type FormType = CommonParams & {
  value: string;

  setValue: (text: string) => void;
};
