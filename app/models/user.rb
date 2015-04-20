
class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  # before_save -> do
  #   self.uid = email if uid.blank? 
  #   skip_confirmation!
  # end

  has_many :moments

  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

  validates :name, presence: true, if: :is_registering?
  validates :nickname, presence: true, if: :is_registering?
  validates :date_of_birth, presence: true, if: :is_registering?
  validates :where_born, presence: true, if: :is_registering?
  validates :finalized_registration, numericality: { equal_to: 2 }, if: :is_registering?

  def is_registering?
    if self.finalized_registration.nil?
      return false
    else
      self.finalized_registration > 0
    end
  end
end
