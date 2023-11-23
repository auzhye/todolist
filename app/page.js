"use client"
import {useState} from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Ollama } from 'ollama-node'

export default function Home() {
 const [out, setOut] = useState();
 const [give, setGive] = useState("mathematics hyperbole");
 const [isLoading, setisLoading] = useState(false);
 const ollama = new Ollama(); // vajag papildus hostot savu Ollama API, to var izdarit caur https://ollama.ai
 const router = useRouter()
 async function getList() {
  await ollama.setModel("llama2");
  try {
   setisLoading(true)
   console.log("Loading");
   ollama.setSystemPrompt("All answers to questions should be related back to what you are most known for.");
   const output = await ollama.generate(`Generate a to-do list that has information about what to do for an upcoming test that is about ${give} and in your output return only the list.`);
   console.log(output.output);
   console.log(output.stats);
   setOut(output.output);
  }
  finally {
   setisLoading(false)
  }
 }
 
 return (
  <div className="flex flex-col items-center h-full">
   <div className="container flex flex-col items-center h-full p-40 md:p-40 p-6">
    <div className="sm:w-3/5 w-full text-center">
     <h1 className="text-5xl text-black">Generate a to-do-list for your next test, quiz or exam!</h1>
    </div>
    <div className="text-center pt-12 w-full">
     <p>Input your topic:</p>
     <input type="input" placeholder="" value={give} onChange={(e) => setGive(e.currentTarget.value)} className="w-full text-black relative resize-none overflow-y-hidden rounded-md border border-neutral-200 py-2 pl-4 pr-8 text-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-75"/>
     <div className="flex justify-center pt-2">
      <button className="flex cursor-pointer items-center rounded-lg bg-neutral-800 px-4 py-1 text-white hover:bg-black focus:outline-none"onClick={getList}>Generate a list</button>
     </div>
     {isLoading ? <p>Loading (1 min)</p> : null}
     <p>{out}</p>
    </div>
    
   </div>
  </div>
 )
}
