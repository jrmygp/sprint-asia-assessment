package checklist

import (
	"server/model"
	"server/repository/checklist"
)

type service struct {
	repository checklist.Repository
}

func NewService(repository checklist.Repository) *service {
	return &service{repository}
}

func (s *service) FindAllByTask(TaskID int) ([]model.Checklist, error) {
	checklists, err := s.repository.FindAllByTask(TaskID)

	return checklists, err
}
