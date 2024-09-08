import { Footer } from 'flowbite-react';
import {BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function FooterWithSocialMediaIcons() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              alt="Axis Bank Logo"
              href="https://axisbank.com"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/AXISBank_Logo.svg/2560px-AXISBank_Logo.svg.png"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Quick Links" />
              <Footer.LinkGroup col>
                <Footer.Link href="/login">
                  Login
                </Footer.Link>
                <Footer.Link href="/register/customer">
                  Register as a Customer
                </Footer.Link>
                <Footer.Link href="/register/employee">
                  Register as an Employee
                </Footer.Link>
                <Footer.Link href="/dashboard">
                    Raise a Complaint Ticket
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Icon
                href="https://www.facebook.com/axisbank/"
                icon={BsFacebook}
                />
                <Footer.Icon
                href="https://www.instagram.com/axis_bank"
                icon={BsInstagram}
                />
                <Footer.Icon
                href="https://twitter.com/AxisBankSupport"
                icon={BsTwitter}
                />
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Axis Bank™"
            href="#"
            year={2023}
          />
        </div>
      </div>
    </Footer>
  )
}


