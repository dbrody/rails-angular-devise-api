class Moment < ActiveRecord::Base
  belongs_to :user

  def as_json(options={})
    {
      id: id,
      content: content,
      type: type,
      user_id: user_id
    }
  end
end

class MomentExperience < Moment
end

class MomentAccomplishment < Moment
end
