import { useState } from 'react';

export default function useRegisterAdmin() {
    const [isLoading] = useState(false);

    return { isLoading };
}
