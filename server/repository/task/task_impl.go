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

	err := r.db.Find(&tasks).Error

	return tasks, err
}

func (r *repository) CreateNew(task model.Task) (model.Task, error) {
	err := r.db.Create(&task).Error

	return task, err
}
