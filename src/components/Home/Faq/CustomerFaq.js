import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { AuthApi } from '../../common/Apis';
import { toast } from '../../common/StylingConstants';
import { useNavigate } from 'react-router-dom';
function CustomerFaq() {
    const [faqData,setFaqData] = useState([]);
    const [searchText,setSearchText] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        getFaqData()
    },[])
    const getFaqData = async () => {
      await AuthApi.get("/faqs").then((response)=>{
        if(response.status===200){
          setFaqData(response.data)
        }
        else{
          toast("Error Retriving FAQ's")
        }
      })
    .catch((e)=>{
      console.log(e)
    })
  }
  return (
    <div className="w-screen text-center px-20 pt-20">
      <form onSubmit={(e)=>{navigate("/tickets/"+searchText)}}>
      <label className="block font-bold text-2xl mb-1">Track Complaint Ticket</label>
      <input
              type="text"
              className="border rounded p-1 w-1/2 mb-2"
              name='question'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
        <button onClick={(e)=>{e.preventDefault();navigate("/tickets/"+searchText)}} className="inline-flex mt-5 ml-2 mb-20 items-center rounded-lg bg-maroon px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
        Search</button>
        </form>
      <h1 className="mb-10 text-center text-2xl font-bold text-gray-900">
      Freqently Asked Questions (FAQ's)</h1>
      <div className="w-full px-20">
      <div className="mx-auto w-full text-left rounded-2xl">
      {faqData.map((faq)=>
       <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-maroon-2 px-10 py-5 mb-2 text-left text-xl font-medium text-maroon hover:bg-maroon-1 focus:outline-none focus-visible:ring focus-visible:bg-maroon-1 focus-visible:ring-opacity-75">
                <span>{faq.question}</span>
                <div className="flex justify-center">
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-8 w-8 text-maroon`}
                />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="px-5 pt-3 pb-10 text-lg text-maroon-4">
              {faq.answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        )}
      </div>
    </div>
    </div>
  )
}

export default CustomerFaq