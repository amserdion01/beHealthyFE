
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {useEffect} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import {BsBookmark} from 'react-icons/bs'
interface IParams extends ParsedUrlQuery {
  id: string
}
type RecipeType = {
  id: string,
  Name: string,
  Author: string,
  AuthorID: string,
  Ingredients: string,
  Details: string,
  Portions: number,
  Preparation: string,
  Cooking: string,
  Tools: string,
}

type Data = {
  recipe: RecipeType
}

const Recipe: NextPage<Data> = (data: Data) => {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
  }, [])
  
  return (
    <div className="h-screen bg-cover font-sans">
      <nav className="p-8 bg-black opacity-50 flex items-center justify-between"></nav>
      <div className="flex items-center justify-between p-10">
        <div className='flex flex-row space-x-8'>
          <AiOutlineStar className="w-8 h-8 " color="black"></AiOutlineStar>
          <BsBookmark className="w-8 h-8 " color="black"></BsBookmark>
        </div>
        <img src='../Icecream.png' alt="Pic" className="object-fill rounded-md aspect-square max-w-lg" />
      </div>
      <p className='text-black'>Recipe: {data.recipe.Author}</p>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<{ recipe: RecipeType }> = async (context) => {
  const API_URL = "tbd"
  const {id} = context.params as IParams
  // const res = await fetch(`${API_URL}/recipe/${id}`)
  // const data: Recipe = await res.json()
  const recipe: RecipeType = {
    "id": "",
    "Name": "Test1",
    "Author": "Go_2dTesasdsaasasdsad123dsaasdasddsaddasdddt",
    "AuthorID": "testing123",
    "Ingredients": "milk,sugar",
    "Details": "inghetata",
    "Portions": 10,
    "Preparation": "00:00:50",
    "Cooking": "00:10:00",
    "Tools": "go"
  }
  return {
    props: {
      recipe,
    },
  }
}
export default Recipe