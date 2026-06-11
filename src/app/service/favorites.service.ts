import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { getCurrentUser } from 'aws-amplify/auth';
import { IFavoriteCurrency } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites$ = new BehaviorSubject<IFavoriteCurrency[]>([]);

  constructor(private firestore: Firestore) {
    this.loadFavorites();
  }

  private async getCurrentUserId(): Promise<string> {
    try {
      const user = await getCurrentUser();
      console.log(user.username);
      return user.userId;
    } catch (error) {
      console.warn('No user authenticated:', error);
      return '';
    }
  }

  loadFavorites(): void {
    this.getCurrentUserId().then((userId) => {
      if (!userId) {
        console.warn('No user authenticated - skipping favorites load');
        return;
      }

      const favoritesCollection = collection(
        this.firestore,
        `users/${userId}/monedasFavoritas`,
      );

      getDocs(query(favoritesCollection, orderBy('posicion')))
        .then((snapshot) => {
          const favorites: IFavoriteCurrency[] = [];
          snapshot.forEach((doc) => {
            favorites.push(doc.data() as IFavoriteCurrency);
          });
          this.favorites$.next(favorites);
        })
        .catch((error) => {
          console.error('Error cargando favoritos:', error);
        });
    });
  }

  getFavorites(): Observable<IFavoriteCurrency[]> {
    return this.favorites$.asObservable();
  }

  async addFavorite(currency: IFavoriteCurrency): Promise<void> {
    const userId = await this.getCurrentUserId();
    if (!userId) {
      console.error('No user authenticated');
      throw new Error('User not authenticated');
    }

    try {
      const posicion = this.favorites$.value.length + 1;
      const docRef = doc(
        this.firestore,
        `users/${userId}/monedasFavoritas/${currency.codigo}`,
      );

      await setDoc(docRef, {
        ...currency,
        posicion,
      });

      `Favorito agregado: ${currency.codigo}`;
      this.loadFavorites();
    } catch (error) {
      console.error('Error agregando favorito:', error);
      throw error;
    }
  }

  async removeFavorite(codigo: string): Promise<void> {
    const userId = await this.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');

    const docRef = doc(
      this.firestore,
      `users/${userId}/monedasFavoritas/${codigo}`,
    );

    await deleteDoc(docRef);
    this.reorderFavorites();
  }

  async updatePosition(codigo: string, newPosition: number): Promise<void> {
    const userId = await this.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');

    const docRef = doc(
      this.firestore,
      `users/${userId}/monedasFavoritas/${codigo}`,
    );

    await updateDoc(docRef, { posicion: newPosition });
    this.loadFavorites();
  }

  private async reorderFavorites(): Promise<void> {
    const favorites = this.favorites$.value.sort(
      (a, b) => a.posicion - b.posicion,
    );

    favorites.forEach((fav, index) => {
      if (fav.posicion !== index + 1) {
        this.updatePosition(fav.codigo, index + 1);
      }
    });
  }

  isFavorite(codigo: string): boolean {
    return this.favorites$.value.some((fav) => fav.codigo === codigo);
  }
}
