export interface UserByIdPatchRequest {
  firstname: string;
  lastname: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_mentor: boolean;
  stack_id: number;
  level_id: number;
  technology_id: number;
  system_level_id: number;
  people_id: number;
  soft_skill_id: number;
  english_level_id: number;
  performance_level_id: number;
  influence_id: number;
}
