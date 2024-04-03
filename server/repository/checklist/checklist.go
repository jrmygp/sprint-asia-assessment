package checklist

import "server/model"

type Repository interface {
	FindAllByTask(TaskID int) ([]model.Checklist, error)
	FindByID(ID int) (model.Checklist, error)
	CreateNew(checklist model.Checklist) (model.Checklist, error)
	Update(checklist model.Checklist) (model.Checklist, error)
	Delete(checklist model.Checklist) (model.Checklist, error)
}
