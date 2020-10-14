import {request} from "./request";

export function getProfile() {
  return request({
    url: '/hello'
  })
}

export class Dog{
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
