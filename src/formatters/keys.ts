export class KeysFormatter {
  static getStudentInfo(studentId: string) {
    return `/students/${studentId}`
  }

  static getStudentOrders(studentId: string) {
    return `/students/${studentId}/orders`
  }
}
