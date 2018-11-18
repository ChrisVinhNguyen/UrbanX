class UserMailer < ApplicationMailer

  	def notify_lender
  		@transaction = params[:transaction]
  		@borrower = @transaction.borrower
  		@lender = @transaction.lender
  		mail(to: @lender.email, subject: 'You have a new transaction request!')
	end


end
