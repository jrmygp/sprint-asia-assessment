package model

import (
	"time"
)

type Task struct {
	ID        int         `gorm:"primaryKey" json:"id"`
	Title     string      `json:"title"`
	Status    string      `json:"status"`
	Deadline  string      `json:"deadline"`
	Checklist []Checklist `gorm:"constraint:OnDelete:CASCADE" json:"checklist"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}
