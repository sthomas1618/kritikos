class UsersController < ApplicationController
  
  def new
  	@user = User.new
  end

  def create
    @user = User.new(params[:user])
    if (@user.save)
      sign_in @user
      flash[:success] = "Welcome to Kritikos!"
      redirect_to root_path
    else
      render 'new'
    end
  end

  private 

    def new_visitor 
      redirect_to(root_path) if signed_in?
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end

    def admin_user 
      redirect_to(root_path) unless current_user.admin?
    end
end
