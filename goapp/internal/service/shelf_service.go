package service

import (
	"context"
	"goapp/internal/model"
	"goapp/internal/repository"

	"go.mongodb.org/mongo-driver/bson"
)

type ShelfService interface {
	CreateShelf(ctx context.Context, req model.CreateShelfRequest) error
	GetShelfs(ctx context.Context) ([]model.Shelf, error)
	GetShelfByID(ctx context.Context, id string) (*model.Shelf, error)
	UpdateShelf(ctx context.Context, id string, req model.UpdateShelfRequest) error
	DeleteShelf(ctx context.Context, id string) error
}

type shelfService struct {
	repo repository.ShelfRepository
}

func NewShelfService(repo repository.ShelfRepository) ShelfService {
	return &shelfService{repo: repo}
}

func (s *shelfService) CreateShelf(ctx context.Context, req model.CreateShelfRequest) error {
	shelf := model.Shelf{
		Name:      req.Name,
		Warehouse: req.Warehouse,
	}
	return s.repo.Create(ctx, &shelf)
}

func (s *shelfService) GetShelfs(ctx context.Context) ([]model.Shelf, error) {
	return s.repo.FindAll(ctx)
}

func (s *shelfService) GetShelfByID(ctx context.Context, id string) (*model.Shelf, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *shelfService) UpdateShelf(ctx context.Context, id string, req model.UpdateShelfRequest) error {
	update := bson.M{}
	if req.Name != nil {
		update["name"] = *req.Name
	}
	if req.Warehouse != nil {
		update["warehouse"] = *req.Warehouse
	}
	return s.repo.Update(ctx, id, update)
}

func (s *shelfService) DeleteShelf(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
