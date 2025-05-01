import React from 'react'
import { useQuery, gql } from '@apollo/client';



const query = gql`
  query getTodosWithUser{
    getTodos {
      id
      title
      completed
      user{
        name
        email
        phone
      }
    }
  }
`;

function App() {

  const { data, loading, error } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-4xl text-center'>Todos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.getTodos.map(todo => (
          <li key={todo.id} className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{todo.title}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Completed:</span> {todo.completed ? '✅ Yes' : '❌ No'}
            </p>
            <div className="mt-4 text-sm text-gray-700">
              <p><span className="font-medium">User:</span> {todo?.user?.name}</p>
              <p><span className="font-medium">Email:</span> {todo?.user?.email}</p>
              <p><span className="font-medium">Phone:</span> {todo?.user?.phone}</p>
            </div>
          </li>
        ))}
    </ul>
    </div>
  )
}

export default App