class Task < ApplicationRecord
  validates :content, presence: true

  scope :active, -> {where(completed: false)}
end
