class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [:name,
             :address_city,
             :address_line_1,
             :address_line_2,
             :address_state,
             :address_country,
             :address_post_zip]
    )

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(
      :account_update,
      keys: [:name,
             :address_city,
             :address_line_1,
             :address_line_2,
             :address_state,
             :address_country,
             :address_post_zip]
    )
  end
end
