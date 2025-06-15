export interface IGraphError {
  errors: [
    {
      message: string,
      locations: string[],
      path: string[],
      extensions: {code: string, status: number}
    }
  ],
  data: { addUser: null }
}
