class UsersController < ApplicationController
  
  def new
  	@user = User.new
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
