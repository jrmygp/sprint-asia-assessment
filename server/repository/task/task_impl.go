package task

import (
	"server/model"

	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAll() ([]model.Task, error) {
	var tasks []model.Task

	err := r.db.Preload("Checklist").Find(&tasks).Error

	return tasks, err
}

func (r *repository) FindByID(ID int) (model.Task, error) {
	var task model.Task

	err := r.db.Find(&task, ID).Error

	return task, err
}

func (r *repository) CreateNew(task model.Task) (model.Task, error) {
	err := r.db.Create(&task).Error

	return task, err
}

func (r *repository) Update(task model.Task) (model.Task, error) {
	err := r.db.Save(&task).Error

	return task, err
}

func (r *repository) Delete(task model.Task) (model.Task, error) {
	err := r.db.Delete(task).Error

	return task, err
}
