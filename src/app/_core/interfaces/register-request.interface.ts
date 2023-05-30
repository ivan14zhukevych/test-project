export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  stack_id: number;
  level_id: number;
  extra_stack_list_id: number[];
}
