require 'spec_helper'

describe "UserPages" do

  subject { page }

  describe "signup page do" do
    before { visit signup_path }

    it { should have_selector('h1', text: 'Sign up') }
    it { should have_selector('title', text: full_title('Sign up')) }
  end 

  describe "signup" do

    before { visit signup_path }

    let(:submit) { "Let's Play" }

    describe "with invalid information" do
      it "should not create a user" do
        expect { click_button submit }.not_to change(User, :count)
      end

      describe "after submission" do
        before { click_button submit }

        it { should have_selector('title', text: 'Sign up') }
        it { should have_content('error') }
      end
    end

    describe "with valid information" do
      before do
        fill_in "Name",             with: "Example User"
        fill_in "Username",         with: "Example_user"
        fill_in "Email",            with: "user@example.com"
        fill_in "Password",         with: "foobar"
        fill_in "Confirm Password", with: "foobar"       
      end

      it "should create a user" do
        expect { click_button submit }.to change(User, :count)
      end

      describe "after saving the user" do
        before { click_button submit }

        let(:user) { User.find_by_email('user@example.com') }

        #it { should have_selector('title', text: user.name) }
        it { should have_selector('div.alert.alert-success', text: 'Welcome to Kritikos!') }
        it { should have_link('Sign out') }
      end
    end
  end


end