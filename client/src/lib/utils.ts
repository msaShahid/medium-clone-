import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (date:string) => {
  //return moment(date).format("d-m-y")
  return moment(date).fromNow()
}