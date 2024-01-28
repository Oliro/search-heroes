export class Localstorage {

    public setFavoriteById(favoriteData: any) {
        localStorage.setItem(`favoriteCharacter-${favoriteData.character}`, JSON.stringify(favoriteData));
    }

    public getFavoriteById(characterId: any) {
        return localStorage.getItem(`favoriteCharacter-${characterId}`);
    }

    public removeFavoriteById(characterId: any) {
        return localStorage.removeItem(`favoriteCharacter-${characterId}`);
    }

    public countFavorite() {
        let count = 0;
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('favoriteCharacter')) {
                count++;
            }
        });

        return count;
    }

}
