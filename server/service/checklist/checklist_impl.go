package checklist

import (
	"server/model"
	"server/repository/checklist"
	request "server/request/checklist"
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

func (s *service) CreateNew(checklistRequest request.CreateChecklistRequest) (model.Checklist, error) {
	checklist := model.Checklist{
		Title:  checklistRequest.Title,
		Status: checklistRequest.Status,
		TaskID: checklistRequest.TaskID,
	}

	newChecklist, err := s.repository.CreateNew(checklist)
	return newChecklist, err
}
