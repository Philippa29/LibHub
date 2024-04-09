import { createAction } from 'redux-actions'; 

enum ActionTypes {
  CREATE_LOAN = 'CREATE_LOAN',
  DELETE_LOAN = 'DELETE_LOAN',
  
  GET_LOANS = 'GET_LOAN',
  GET_LOAN_BY_STUDENT_ID = 'GET_LOAN_BY_STUDENT_ID',
  IS_RETURNED = 'IS_RETURNED',
  LOAN_COUNT = 'LOAN_COUNT',
}

export const createLoan = createAction(ActionTypes.CREATE_LOAN);
export const deleteLoan = createAction(ActionTypes.DELETE_LOAN);
export const getLoans = createAction(ActionTypes.GET_LOANS);
export const getLoanByStudentId = createAction(ActionTypes.GET_LOAN_BY_STUDENT_ID);
export const isReturned = createAction(ActionTypes.IS_RETURNED);
export const loanCount = createAction(ActionTypes.LOAN_COUNT);