class StaticController < ApplicationController
	def home
	end

	def about
		@msg = "about"
	end
end
