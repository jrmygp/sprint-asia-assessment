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

func (r *repository) FindByID(ID int) (model.Checklist, error) {
	var checklist model.Checklist

	err := r.db.Find(&checklist, ID).Error

	return checklist, err
}

func (r *repository) CreateNew(checklist model.Checklist) (model.Checklist, error) {
	err := r.db.Create(&checklist).Error

	return checklist, err
}

func (r *repository) Update(checklist model.Checklist) (model.Checklist, error) {
	err := r.db.Save(&checklist).Error

	return checklist, err
}

func (r *repository) Delete(checklist model.Checklist) (model.Checklist, error) {
	err := r.db.Delete(checklist).Error

	return checklist, err
}
