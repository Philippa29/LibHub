import { createAction } from 'redux-actions'; 
import { ILoanContext } from './context';

export enum ActionTypes {
  CREATE_LOAN = 'CREATE_LOAN',
  DELETE_LOAN = 'DELETE_LOAN',
  
  GET_LOANS = 'GET_LOAN',
  GET_LOAN_BY_STUDENT_ID = 'GET_LOAN_BY_STUDENT_ID',
  IS_RETURNED = 'IS_RETURNED',
  LOAN_COUNT = 'LOAN_COUNT',
}



export const createLoanAction = createAction<string>(ActionTypes.CREATE_LOAN);
export const deleteLoan = createAction(ActionTypes.DELETE_LOAN);
export const getLoansAction = createAction<ILoanContext, ILoanContext>(ActionTypes.GET_LOANS, p=>p);
export const getLoanByStudentId = createAction<ILoanContext,ILoanContext>(ActionTypes.GET_LOAN_BY_STUDENT_ID, p=>p);
export const isReturnedAction = createAction(ActionTypes.IS_RETURNED);
export const loanCountAction = createAction(ActionTypes.LOAN_COUNT);