import React, { CSSProperties } from 'react';

export type FormData = ResetPasswordData & {
  first_name: string;
  user_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
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

export type UserState = {
  currentUser: any;
  accountDetails: {
    accounts: Account[];
  };
  transactionDetails: TransactionType[];
  totalTransactionsCount: number;

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
