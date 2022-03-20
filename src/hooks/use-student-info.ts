import useSWR from 'swr'
import { StudentData } from '~/entities/student'

export function useStudentInfo(studentId: string) {
  const { data, error } = useSWR<StudentData>(`/students/${studentId}`)

  return {
    student: data,
    isLoading: !error && !data,
    isError: error,
  }
}
