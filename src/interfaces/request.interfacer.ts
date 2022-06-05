export interface request {
  id_request: number,
  initial_date: string,
  final_date: string,
  state: string
}
export interface requestDate {
  id_request: number,
  initial_date: Date,
  final_date: Date,
  state: string
}