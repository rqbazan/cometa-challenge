import useSWR from 'swr'
import { RootObject } from './types'

export function useStudentInfo(studentId: string) {
  const { data, error } = useSWR<RootObject>(`/students/${studentId}`)

  return {
    student: data,
    isLoading: !error && !data,
    isError: error,
  }
}
