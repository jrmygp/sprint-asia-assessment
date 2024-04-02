package checklist

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

func (r *repository) FindAllByTask(TaskID int) ([]model.Checklist, error) {
	var checklists []model.Checklist

	err := r.db.Where("task_id = ?", TaskID).Find(&checklists).Error

	return checklists, err
}
