export class FindUsersDTO {

  page: string;

  pageSize: string;

  role: 'admin' | 'editor' | 'ghost';
}
