import { Dialog as D, Transition } from '@headlessui/react'
import { Fragment} from 'react'

function Dialog({isOpen,setIsOpen,title,content,closeText}) {
  return (
    
      <Transition appear show={isOpen} as={Fragment}>
        <D as="div" className="relative z-10" onClose={()=>{setIsOpen(false)}}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <D.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <D.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </D.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {content}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{setIsOpen(false)}}
                    >
                      {closeText}
                    </button>
                  </div>
                </D.Panel>
              </Transition.Child>
            </div>
          </div>
        </D>
      </Transition>
  )
}
export default Dialog;
