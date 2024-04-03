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

func (s *service) FindByID(ID int) (model.Checklist, error) {
	checklist, err := s.repository.FindByID(ID)

	return checklist, err
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

func (s *service) Update(ID int, checklistRequest request.UpdateChecklistRequest) (model.Checklist, error) {
	checklist, _ := s.repository.FindByID(ID)

	if checklistRequest.Title != "" {
		checklist.Title = checklistRequest.Title
	}
	if checklistRequest.Status != "" {
		checklist.Status = checklistRequest.Status
	}

	updatedChecklist, err := s.repository.Update(checklist)

	return updatedChecklist, err
}

func (s *service) Delete(ID int) (model.Checklist, error) {
	checklist, _ := s.repository.FindByID(ID)

	deletedChecklist, err := s.repository.Delete(checklist)

	return deletedChecklist, err
}
