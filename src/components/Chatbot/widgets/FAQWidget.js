import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { UnAuthApi } from '../../common/Apis';

export default function FAQ() {
  const [faqData,setFaqData] = useState([]);
  useEffect(()=>{
    getFaqData();
  },[])
  const getFaqData = async () => {
    await UnAuthApi.get("/faqs").then((response)=>{
      if(response.status===200){
        setFaqData(response.data)
      }
      else{
        console.log("Error Retriving FAQ's")
      }
    })
  .catch((e)=>{
    console.log(e)
  })
}
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        {faqData.map(faq => {
          return(
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-maroon hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-maroon`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-900">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          )})}
      </div>
    </div>
  )
}
