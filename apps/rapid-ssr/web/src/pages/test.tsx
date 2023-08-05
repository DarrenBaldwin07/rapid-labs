import { useState } from 'react'
import { useLoaderData } from '../abstractions/app';
import { Tab } from '@headlessui/react'


export default function Test(props: any) {
  const data = useLoaderData(props);
  return (
    <div>
      {data.todos.map((data: any) => (
        <h1>{data?.title}</h1>
      ))}
    </div>
  )
}
