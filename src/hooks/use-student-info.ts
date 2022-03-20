import useSWR from 'swr'
import { StudentData } from '~/entities/student'
import { KeysFormatter } from '~/formatters'

export function useStudentInfo(studentId: string) {
  const { data, error } = useSWR<StudentData>(KeysFormatter.getStudentInfo(studentId))

  return {
    student: data,
    isLoading: !error && !data,
    isError: error,
  }
}
